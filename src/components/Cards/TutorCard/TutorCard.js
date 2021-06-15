export default function TutorCard(props) {
  const tutor = props.tutor;
    return (
      <div className="mt-2 bg-white shadow-md  rounded-3xl p-2">
      <article className=" flex space-x-4">
        <img src="https://wallpapercave.com/wp/wp5192934.jpg" alt="" className="flex-none w-15 h-15 rounded-lg object-cover bg-gray-100" width="144" height="144" />
        <div className="ml-3 min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
          <h2 className="text-lg font-semibold text-black mb-0.5">
            {(tutor.tutor_data.firstName + " " + tutor.tutor_data.lastName).toUpperCase()}
          </h2>
          <dl className="flex flex-wrap text-sm font-medium whitespace-pre">
            <div>
                <p className="text-grey" >Gender: {tutor.tutor_data.gender}</p>
            </div>
            <div className="flex-none w-full mt-0.5 font-normal">
              <p className="inline text-black">Distance In Between: {tutor.distance_in_between}</p>
            </div>
            <div className="absolute top-0 right-0 rounded-full bg-amber-50 text-amber-900 px-2 py-0.5  sm:flex  xl:flex items-center space-x-1">
              
            <button className="" onClick={()=>{
              props.handler(props.childId, tutor.tutor_data.id)
            }}>
                Assign
            </button>
            </div>
          </dl>
        </div>
      </article>
      </div>
    )
  }