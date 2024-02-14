function Profile({params}:{params:{id:string}}) {
    return (
      <div>
        <h1>Profile:<span>{params.id}</span></h1>
      </div>
    )
  }
  
  export default Profile