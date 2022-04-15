import React from "react";
import PropTypes from "prop-types";
import logo from "../assets/logo.png";

function About(props) {
  return (
    <div className="container">
      <img src={logo} />
      <br />
      <br />
      <h1>About</h1>
      <div>
        <p>
          PropGraph: Find undervalued and comparable properties using
          graph-based relationships powered on TigerGraph.
        </p>

        <p>
          With real estate at a recent all time demand high, the need for
          determining valuations effectively is important as ever. Often
          comparables for real estate valuation are derived at the discretion of
          the real estate agent, or simply based off the zestimate or redfin
          estimate for a property.{" "}
        </p>

        <p>
          These methods can also be extremely opaque - with little to no
          visibility into the exact parameters that influence the price. When an
          agent picks comparables, often this goes one layer deep - ex: the
          property is compared to three adjacent properties. PropGraph provides
          a graph based solution that allows querying a given property and
          finding deeper relationships against recently sold properties.{" "}
        </p>
        <p>
          With PropGraph, you can take many 1-layer graphs (ex: one agent doing
          a comparable on a property) and go N layers deep instead by mapping
          across all comparables shared by multiple agents.{" "}
        </p>

        <p>
          Now with this strategy you can compare a property in Boston to a
          property that recently sold in the UK for example via transitive
          graph.
        </p>
      </div>
    </div>
  );
}

About.propTypes = {};

export default About;
