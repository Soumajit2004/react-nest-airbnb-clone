import searchIcon from "../../../assets/icons/search-icon.svg"

export default function RootNavbarSearch() {
  return (
    <label
      className="input input-bordered pr-2 flex min-w-96 w-full rounded-full drop-shadow input-md bg-white">
      <input type="text" className="grow" placeholder="Search Destinations"/>
      <button className={"btn btn-sm my-auto btn-primary btn-circle"}>
        <img src={searchIcon} alt={"search-icon"}/>
      </button>
    </label>
  )
}