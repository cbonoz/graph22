<p align='center'>
    <img src="./img/logo.png" width=600/>
</p>

\*\*Contributors and Contact Information:

\*\*Problem Statement addressed:
PropGraph: A graph database comparable model for real estate.

<!--
PropGraph: A property graph database.
 -->

Intro slides: https://docs.google.com/presentation/d/1UGDiIgigPEodtkFg_F-mBde0eaogOYEyHCJ-S14rk3M/edit?usp=sharing

**Description**:

Find undervalued and comparable properties using graph-based relationships powered on TigerGraph.

With real estate at a recent all time demand high, the need for determining valuations effectively is important as ever. Often comparables for real estate valuation are derived at the discretion of the real estate agent, or simply based off the zestimate or redfin estimate for a property. While these can all be used as reference points, you may find that th

These methods can also be extremely opaque - with little to no visibility into the exact parameters that influence the price.

PropGraph provides a graph based solution that allows querying a given property and finding the relationships against recently sold properties.

Key graph elements:

- Descriptive words (renovated, new kitchen, new bathroom, flooring, etc.)

Standard quantitative fields:

- Bedrooms
- Bathrooms
- Square footage

- Relationships between different property keywords.
- Find corresponding properties based on graph relationships matching multiple criteria simultaneously.

Wanted to use a graph databases to create a model for valuation that's understandable

- Helps reduce bias in real estate pricing.
- Ingests and graphs data through several mainstream real estate websites, including Redfin, Zillow, and Trulia.
- Creates an AI model in real time and serves it.

Explain what your project is trying to accomplish and how you utilized graph technology to achieve those goals.
Describe how your submission is relevant to the problem statement and why it is impactful to the world. Remember to link your submission video here.

Tell us how your entry was the most...

- Impactful in solving a real world problem
- Innovative use case of graph
- Ambitious and complex graph
- Applicable graph solution

Other additions:

- **Data**: Give context for the dataset used and give full access to judges if publicly available or metadata otherwise.
- **Technology Stack**: Describe technologies and programming languages used.
- **Visuals**: Feel free to include other images or videos to better demonstrate your work.
- Link websites or applications if needed to demonstrate your work.

## Dependencies

State any dependencies and their versions needed to be installed to test this project. This may include programming languages, frameworks, libraries, and etc.

## Installation

Clone this repo and follow the steps below for the backend and frontend configuration locally.

### Structure

`./propgraph`: Client-side code.
`./server`: Jupyter notebook to configure the graph DB and backend server code.
`./data`: Example property data.
`./img`: Example screenshots of the application.

#### Backend

1. Set up a tigergraph cloud instance at tgcloud.io, set the credentials to access that instance via the following environment variables.

<pre>
    TIGER_HOST={YOUR_TIGERGRAPH_HOST}
    TIGER_USER={YOUR_TIGERGRAPH_USER}
    TIGER_PW={YOUR_TIGERGRAPH_PASSWORD}
    TIGER_TOKEN={YOU_TIGERGRAPH_TOKEN} # optional, fetched at runtime if unset.
</pre>

2. To bootstrap base/empty graph for PropGraph, run a jupyter notebook from the `./server` directory and open `graphsetup.ipynb`. Install dependencies in first cell and run all cells below.
3. `chmod 755 run.sh`
4. Run `./run.sh`

The server should now be running on port 8000.

#### Frontend

From the `./propgraph` folder:

<pre>
yarn
yarn start
</pre>

The PropGraph frontend should now be running on port 3000.

## Known Issues and Future Improvements

Explain known liminations within the project and potential next steps.

## Reflections

Review the steps you took to create this project and the resources you were provided. Feel free to indiciate room for improvement and general reflections.

## References

Please give credit to other projects, videos, talks, people, and other sources that have inspired and influenced your project.

### Graph DB resources:

- https://tgcloud.io/app/solutions

### Dev Notes

- More credits: https://docs.google.com/forms/d/e/1FAIpQLSdoK6wIj4iFJtzeFWFl4yPQK6h8TzmQMsYnG6upZiM1A8W5VQ/viewform
- Notebook: https://github.com/pyTigerGraph/pyTigerGraph/blob/master/examples/GSQL101%20-%20PyTigerGraph.ipynb
