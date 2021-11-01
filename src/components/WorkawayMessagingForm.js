import React from "react";
import { useForm } from "react-hook-form";

function WorkawayMessagingForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Email" {...register("email")} />
      <input placeholder="Password" {...register("password")} />
      <label>Healess</label>
      <input type="checkbox" {...register("headless")} />
      {/* register your input into the hook by invoking the "register" function */}
      <input placeholder="City" {...register("city")} />
      <button>Search</button>
      <label>City and country:</label>
      <select
        id="cityWithCountry"
        {...register("cityWithCountry", { required: true })}
      >
        <option value="">-</option>
        <option value="Sevilla, Spain">Sevilla, Spain</option>
        <option value="Sdeefe, Spain">Sdeefe, Spain</option>
      </select>

      <label>Detection radius:</label>
      <select {...register("detectionRadius", { required: true })}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="250">250</option>
        <option value="500">500</option>
      </select>

      {/* include validation with required or other standard HTML validation rules */}
      <input
        placeholder="Minimum age range"
        {...register("ageMin", { required: true })}
      />
      <input
        placeholder="Maximum age range"
        {...register("ageMax", { required: true })}
      />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <input
        placeholder="Message subject"
        {...register("subject", { required: true })}
      />
      <textarea
        placeholder="Message (English version)"
        {...register("englishMessage", { required: true })}
      />
      <textarea
        type="textarea"
        placeholder="Message (French version)"
        {...register("frenchMessage", { required: true })}
      />

      <input type="submit" value="Start" />
    </form>
  );
}

export default WorkawayMessagingForm;
