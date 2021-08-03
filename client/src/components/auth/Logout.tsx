const Logout = () => {
  return(
    <p onClick={() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('title');
      window.location.href = '/';
    }} className="cursor-pointer" >Logout</p>
  )
}

export default Logout;