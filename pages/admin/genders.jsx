import axios from "axios";
import React, { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";
import Layout from "./layout";
function Genders({ swal }) {
  const [genders, setGenders] = useState([]);
  const [editedGender, setEditedGender] = useState(null);
  const [name, setName] = useState("");

 
  useEffect(() => {
    fetchGenders();
  }, []);

  // Fetching all genders
  async function fetchGenders() {
    try {
      const response = await axios.get("/api/server/genders");
      setGenders(response.data);
    } catch (error) {
      console.error("Error fetching genders", error);
    }
  }

  // Save or update gender
  async function saveGender(ev) {
    ev.preventDefault();
    const data = { name };

    if (editedGender && editedGender._id) {
      data._id = editedGender._id;

      try {
        await axios.put(`/api/server/genders/`, data);
      } catch (error) {
        console.error("Error updating gender", error);
      }
    } else {
      try {
        await axios.post("/api/server/genders", data);
      } catch (error) {
        console.error("Error creating gender", error);
      }
    }

    setEditedGender(null);
    setName("");
    fetchGenders(); // Refresh the gender list
  }

  // Set selected gender for editing
  function editGender(gender) {
    setEditedGender(gender);
    setName(gender.name);
    console.log("Editing gender:", gender); // Debugging selected gender
  }

  // Delete gender with confirmation dialog
  function deleteGender(gender) {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete ${gender.name}?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, delete!",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`/api/server/genders?_id=${gender._id}`);
            fetchGenders(); // Refresh the gender list after deletion
          } catch (error) {
            console.error("Deletion was not successful", error);
          }
        }
      });
  }

  return (
    <Layout>
      <h1>Genders</h1>
      <label>
        {editedGender
          ? `Edit Gender ${editedGender.name}`
          : "Create Gender name"}
      </label>
      <form onSubmit={saveGender} className="flex gap-1">
        <input
          type="text"
          placeholder="Gender name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>

      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Gender name</td>
          </tr>
        </thead>
        <tbody>
          {genders.length > 0 &&
            genders.map((gender) => (
              <tr key={gender._id}>
                <td className="flex justify-between">
                  {gender.name}
                  <div>
                    <button
                      onClick={() => editGender(gender)}
                      className="btn-primary mr-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteGender(gender)}
                      className="btn-red mr-1"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}

// Wrap Genders component with sweetalert2
export default withSwal(({ swal }, ref) => <Genders swal={swal} />);
