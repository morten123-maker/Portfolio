"use client";

export default function Error() {
  return (
    <div className="p-10">
      <h1>Etwas ist schiefgelaufen.</h1>
      <button onClick={() => window.location.reload()}>
        Neu laden
      </button>
    </div>
  );
}