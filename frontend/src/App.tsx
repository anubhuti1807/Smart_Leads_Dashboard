import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import "./App.css";


// TYPE

interface Lead {
  id: number;
  name: string;
  email: string;
  status: string;
}


function App() {

  const [leads, setLeads] =
    useState<Lead[]>([]);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("New");

  const [filter, setFilter] =
    useState("");

  const [page, setPage] =
    useState(1);



  // GET LEADS

  const getLeads = async () => {

    const response =
      await axios.get(
        `http://localhost:5000/leads?search=${search}&page=${page}&status=${filter}`
      );

    setLeads(response.data);
  };



  useEffect(() => {

    getLeads();

  }, [search, page, filter]);



  // ADD LEAD

  const addLead = async () => {

    if (!name || !email) {

      alert("Enter all fields");

      return;
    }

    await axios.post(
      "http://localhost:5000/leads",
      {
        name,
        email,
        status
      }
    );

    setName("");

    setEmail("");

    setStatus("New");

    getLeads();
  };



  // DELETE

  const deleteLead =
    async (id: number) => {

      await axios.delete(
        `http://localhost:5000/leads/${id}`
      );

      getLeads();
    };



  // CSV EXPORT

  const exportCSV = () => {

    const rows = [];

    rows.push(
      "Name,Email,Status"
    );

    leads.forEach((lead) => {

      rows.push(
        `${lead.name},${lead.email},${lead.status}`
      );
    });

    const blob =
      new Blob(
        [rows.join("\n")],
        {
          type: "text/csv"
        }
      );

    const url =
      window.URL.createObjectURL(
        blob
      );

    const a =
      document.createElement("a");

    a.href = url;

    a.download = "leads.csv";

    a.click();
  };



  return (

    <div className="container">


      {/* HEADER */}

      <div className="top-bar">

        <h1>
                          Smart Leads Dashboard 🚀
        </h1>

      </div>



      {/* SEARCH */}

      <div className="search-box">

        <input
          type="text"
          placeholder="Search Lead"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

      </div>



      {/* FILTER */}

      <select
        value={filter}
        onChange={(e) =>
          setFilter(
            e.target.value
          )
        }
      >

        <option value="">
          All Status
        </option>

        <option value="New">
          New
        </option>

        <option value="Contacted">
          Contacted
        </option>

        <option value="Qualified">
          Qualified
        </option>

        <option value="Lost">
          Lost
        </option>

      </select>



      {/* FORM */}

      <div className="form">

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
        />


        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />


        <select
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value
            )
          }
        >

          <option>
            New
          </option>

          <option>
            Contacted
          </option>

          <option>
            Qualified
          </option>

          <option>
            Lost
          </option>

        </select>



        <button
          onClick={addLead}
        >
          Add Lead
        </button>

      </div>



      {/* CSV */}

      <button
        onClick={exportCSV}
      >
        Export CSV
      </button>



      {/* LEADS */}

      <div className="leads">

        {leads.map((lead) => (

          <div
            key={lead.id}
            className="card"
          >

            <h3>
              {lead.name}
            </h3>

            <p>
              {lead.email}
            </p>

            <p>
              {lead.status}
            </p>


            <button
              onClick={() =>
                deleteLead(
                  lead.id
                )
              }
            >
              Delete
            </button>

          </div>

        ))}

      </div>



      {/* PAGINATION */}

      <div className="pagination">

        <button
          onClick={() =>
            setPage(page - 1)
          }
          disabled={page === 1}
        >
          Previous
        </button>


        <button
          onClick={() =>
            setPage(page + 1)
          }
        >
          Next
        </button>

      </div>

    </div>
  );
}

export default App;