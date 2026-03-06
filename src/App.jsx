import React, { useState } from "react";

const App = () => {

    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([]);

    const Add = () => {
        if (todo.trim() === "") { return; }
        setTodoList([...todoList, { id: Date.now(), text: todo, completed: false }]);
        setTodo('');
    }

    const Delete = (id) => {
        setTodoList(todoList.filter(item => item.id !== id));
    }

    const toggleComplete = (id) => {
        setTodoList(todoList.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        ));
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Todo List</h1>

                {/* Input Row */}
                <div className="flex gap-2 mb-6">
                    <input
                        type="text"
                        placeholder="Enter your task..."
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && Add()}
                        className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
                        required
                    />
                    <button
                        onClick={Add}
                        className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                        Add
                    </button>
                </div>

                {/* Todo Items */}
                <ul className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                    {todoList.map((item) => (
                        <li
                            key={item.id}
                            className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3"
                        >
                            <span className={`flex-1 text-gray-700 ${item.completed ? "line-through text-gray-400" : ""}`}>
                                {item.text}
                            </span>
                            <div className="flex items-center gap-2 ml-3">
                                <input
                                    type="checkbox"
                                    checked={item.completed}
                                    onChange={() => toggleComplete(item.id)}
                                    className="w-4 h-4 accent-green-500 cursor-pointer"
                                />
                                <button
                                    onClick={() => Delete(item.id)}
                                    className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-sm font-semibold px-3 py-1 rounded-lg transition-colors cursor-pointer"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                {todoList.length === 0 && (
                    <p className="text-center text-gray-400 mt-4">No tasks yet. Add one above!</p>
                )}
            </div>
        </div>
    );
}

export default App;