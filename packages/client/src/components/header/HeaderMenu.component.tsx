import SignUpDialog from "../SignUpDialog.component.tsx";

function UnauthenticatedDropdown() {
  return (
    <>
      <SignUpDialog/>
      <ul
        className="menu menu-md font-bold dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow-xl border-2 mt-2">
        <li><a>Sign In</a></li>
        <li>
          <button onClick={() => document.getElementById('my_modal_1').showModal()}>
            Sign Up
          </button>
        </li>
      </ul>
    </>
  )
}

export default function HeaderMenuComponent() {
  return (
    <details className="dropdown dropdown-end">
      <summary className="btn flex gap-2 bg-base-100 border-2 rounded-full p-2 hover:bg-base-200">
        <span className={"material-symbols-rounded"}>menu</span>

        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" id="user">
          <path fill="#000" fillRule="evenodd"
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm3-12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 7a7.489 7.489 0 0 1 6-3 7.489 7.489 0 0 1 6 3 7.489 7.489 0 0 1-6 3 7.489 7.489 0 0 1-6-3Z"
                clipRule="evenodd"></path>
        </svg>
      </summary>

      <UnauthenticatedDropdown/>
    </details>
  )
}
