import express, {
  Request,
  Response
} from "express";

import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());


// TYPES

interface Lead {
  id: number;
  name: string;
  email: string;
  status: string;
}


// SIMPLE DATABASE

let leads: Lead[] = [

  {
    id: 1,
    name: "Rahul",
    email: "rahul@gmail.com",
    status: "New"
  },

  {
    id: 2,
    name: "Priya",
    email: "priya@gmail.com",
    status: "Contacted"
  },

  {
    id: 3,
    name: "Aman",
    email: "aman@gmail.com",
    status: "Qualified"
  }

];



// GET LEADS

app.get(
  "/leads",
  (
    req: Request,
    res: Response
  ) => {

    const search =
      (req.query.search as string) || "";

    const page =
      Number(req.query.page) || 1;

    const limit = 5;

    const status =
      (req.query.status as string) || "";


    // SEARCH

    let filteredLeads =
      leads.filter((lead) =>
        lead.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );


    // FILTER

    if (status) {

      filteredLeads =
        filteredLeads.filter(
          (lead) =>
            lead.status === status
        );
    }


    // PAGINATION

    const start =
      (page - 1) * limit;

    const end =
      start + limit;

    const paginatedLeads =
      filteredLeads.slice(
        start,
        end
      );


    res.json(paginatedLeads);
  }
);



// ADD LEAD

app.post(
  "/leads",
  (
    req: Request,
    res: Response
  ) => {

    const newLead: Lead = {

      id: Date.now(),

      name: req.body.name,

      email: req.body.email,

      status: req.body.status
    };

    leads.push(newLead);

    res.json(newLead);
  }
);



// DELETE LEAD

app.delete(
  "/leads/:id",
  (
    req: Request,
    res: Response
  ) => {

    const id =
      Number(req.params.id);

    leads = leads.filter(
      (lead) => lead.id !== id
    );

    res.json({
      message: "Deleted"
    });
  }
);



// SERVER

app.listen(5000, () => {

  console.log(
    "Server running on port 5000"
  );

});