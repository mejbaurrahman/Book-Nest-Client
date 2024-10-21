/* eslint-disable react/prop-types */
export default function SpecialButton({ name }) {
  return (
    <button className="btn btn-md btn-ghost btn-outline border border-b-4">
      {name}
    </button>
  );
}
