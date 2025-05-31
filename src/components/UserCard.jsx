const UserCard = ({ user, isFeed }) => {
  const { age, gender, photoUrl, about, firstName, lastName } = user;
  return (
    <div className="card bg-base-300 w-80 shadow-sm">
      <figure>
        <img src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>

        {isFeed && (
          <div className="card-actions justify-between my-4">
            <button className="btn btn-error w-30"> Ignore </button>
            <button className="btn btn-primary w-30">Interested</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
