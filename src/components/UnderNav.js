const UnderNav = ({ data }) => {
  return (
    <section className="underNav">
      <div>
        <h1>{data.restaurant.name}</h1>
        <p>{data.restaurant.description}</p>
      </div>
      <img src={data.restaurant.picture} alt="menu" />
    </section>
  );
};

export default UnderNav;
