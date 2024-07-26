<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    /**
     * Get all tasks for the authenticated user.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $user = auth()->user();
    
        if ($user) {
            $tasks = $user->tasks;
            return response()->json($tasks);
        } else {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }
    }

    /**
     * Create a new task for the authenticated user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $task = new Task();
        $task->name = $request->name;
        $task->completed = false;
        $task->user_id = auth()->user()->id;
        $task->save();

        return response()->json($task, 201);
    }

    /**
     * Mark a task as completed.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\JsonResponse
     */
    public function complete($id)
    {
        $task = Task::find($id);
        $task->completed = true;
        $task->save();

        return response()->json($task);
    }

    /**
     * Delete a task.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $task = Task::find($id);
        $task->delete();
        return response()->json(null, 204);
    }
}
