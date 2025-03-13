import { BadgePlus, Captions, Clock, Dumbbell, Repeat } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import MyInput from './myInput';
import { useContext, useState } from 'react';
import { WorkoutContext } from '../context/context';
import Toast from './myToast';
import { toast, Toaster } from 'sonner';

export default function MyDialog() {
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const { dispatch } = useContext(WorkoutContext)
    const handleSubmit = async (e) => {
        console.log('handle called');

        e.preventDefault();
        const workout = { title, load, reps }

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const json = await response.json();
        if (!response.ok) {
            toast.error("Error", {
                description: json.error || "Something went wrong",
                action: {
                    label: "close",
                    onClick: () => console.log("Undo"),
                },
            });
        }
        else {
            setTitle('')
            setLoad('')
            setReps('')
            console.log("new workout added");
        
            toast.success("Workout Added", {
                description: `Title: ${title}`,
                action: {
                        label: "close",
                        onClick: () => console.log("Undo"),
                    },
            });
            dispatch({ type: 'ADD_WORKOUT', payload: json })
        }

    }
    console.log(title);

    return (

        <Dialog>
            <DialogTrigger asChild>
                {/* ✅ Ensure it wraps only ONE child */}
                <button className="p-2 bg-green-100 rounded-full text-green-600 cursor-pointer">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div>
                                    <BadgePlus />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Add new workout</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Workout</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between">
                            <Label htmlFor="name" className="text-right">
                            <Captions className="w-5 h-5 text-yellow-800" />
                                Name
                            </Label>
                            <MyInput id="name" value={title} set={setTitle} e_class="flex-1" placeholder="Exercise" type={'text'}/>
                        </div>
                        <div className="flex justify-between">
                            <Label htmlFor="load" className="text-right">
                            <Dumbbell className="w-5 h-5 text-red-700" />
                                Load
                            </Label>
                            <MyInput id="load" set={setLoad} value={load} e_class="flex-1" placeholder="Total weight" type={'number'}/>
                        </div>
                        <div className="flex justify-between">
                            <Label htmlFor="reps" className="text-right">
                            <Repeat className="w-5 h-5 text-amber-500" />
                                Reps
                            </Label>
                            <MyInput id="reps" value={reps} set={setReps} e_class="flex-1" placeholder="Repetitions" type={'number'}/>
                        </div>
                    </div>

                        
                    <DialogFooter>
                        <DialogClose>
                            <Button className="cursor-pointer w-24  mt-10" type="submit">Add</Button>
                        </DialogClose>
                    </DialogFooter>

                </form>

            </DialogContent>
        </Dialog>

    )
}