"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FiSearch } from "react-icons/fi";

export function Input() {
  const [input, setInput] = useState("");
  const router = useRouter();

  function handleSearch(event: FormEvent) {
    event.preventDefault();
    if (input === "") return;

    router.push(`/game/search/${input}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="w-full bg-slate-200 my-5 flex px-2 items-center justify-between rounded-lg p-2"
    >
      <input
        type="text"
        placeholder="Procurando Algum Jogo..."
        value={input}
        onChange={(event) => setInput(event.target.value)}
        className="bg-slate-200 outline-none w-11/12"
      />
      <button type="submit">
        <FiSearch size={24} color="#EA580C" />
      </button>
    </form>
  );
}
