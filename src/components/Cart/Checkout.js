import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    apartmentNo: true,
    complex: true,
    city: true,
  });

  const nameInputRef = useRef();
  const apartmentNoInputRef = useRef();
  const complexInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredApartmentNo = apartmentNoInputRef.current.value;
    const enteredComplex = complexInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredApartmentNoIsValid = !isEmpty(enteredApartmentNo);
    const enteredComplexIsValid = !isEmpty(enteredComplex);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputValidity({
      name: enteredNameIsValid,
      apartmentNo: enteredApartmentNoIsValid,
      complex: enteredComplexIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredApartmentNoIsValid &&
      enteredComplexIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
        name: enteredName,
        apartmentNo: enteredApartmentNo,
        complex: enteredComplex,
        city: enteredCity,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;
  const apartmentNoControlClasses = `${classes.control} ${
    formInputValidity.apartmentNo ? "" : classes.invalid
  }`;
  const complexControlClasses = `${classes.control} ${
    formInputValidity.complex ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter valid name!</p>}
      </div>
      <div className={apartmentNoControlClasses}>
        <label htmlFor="aptno">Apartment no:</label>
        <input type="text" id="aptno" ref={apartmentNoInputRef} />
        {!formInputValidity.apartmentNo && <p>Please enter a valid apartment number!</p>}
      </div>
      <div className={complexControlClasses}>
        <label htmlFor="complex">Complex name</label>
        <input type="text" id="complex" ref={complexInputRef} />
        {!formInputValidity.complex && <p>Please enter a valid Complex name!</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
