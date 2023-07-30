"use client";

import { listReducer } from "@/reducers/listReducer";
import { useReducer, useState } from "react";

const page = () => {
  const [list, dispatch] = useReducer(listReducer, []);
  const [addField, setAddField] = useState("");

  const handleAddBtn = () => {
    if (addField.trim() === "") return false;

    dispatch({
      type: "add",
      payload: {
        text: addField.trim(),
      },
    });

    setAddField("");
  };

  const handleDoneCheckbox = (id: number) => {
    dispatch({
      type: "toggleDone",
      payload: { id },
    });
  };

  const handleEdit = (id: number) => {
    const item = list.find((it) => it.id === id);
    if (!item) return false;

    const newText = window.prompt("Editar Tarefa", item.text);
    if (!newText || newText.trim() === "") return false;

    dispatch({
      type: "editText",
      payload: { id, newText },
    });
  };

  const handleRemove = (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir?")) return false;

    dispatch({
      type: "remove",
      payload: { id },
    });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-4xl my-4">Lista de Tarefas</h1>
      <div className="max-w-2xl mx-auto flex rounded-md bg-gray-900 border border-gray-400 p-4 my-4">
        <input
          type="text"
          className="flex-1 rounded-md border border-white p-3 bg-transparent text-white"
          placeholder="Digite um item"
          value={addField}
          onChange={(e) => setAddField(e.target.value)}
        />
        <button className="p-4 uppercase" onClick={handleAddBtn}>
          Adicionar
        </button>
      </div>
      <ul className="max-w-2xl mx-auto">
        {list.map((item) => (
          <li
            key={item.id}
            className="flex items-center p-3 my-3 border-b border-gray-700"
          >
            <input
              type="checkbox"
              className="w-6 h-6 mr-4"
              checked={item.done}
              onClick={() => handleDoneCheckbox(item.id)}
            />
            <p className="flex-1 text-lg">{item.text}</p>
            <button
              className="mx-4 text-white hover:text-gray-500"
              onClick={() => handleEdit(item.id)}
            >
              Editar
            </button>
            <button
              className="mx-4 text-white hover:text-gray-500"
              onClick={() => handleRemove(item.id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;
