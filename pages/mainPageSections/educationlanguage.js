import React from "react";
import Link from "next/link";

function educationlanguage() {
  return (
    <div>
      <h1>
        Educational Resources for Immigrants, Refugees, Asylees and other New
        Americans{" "}
      </h1>
      <p>
        {" "}
        Welcome to the U.S. Department of Education's and Language's page
        dedicated to providing information and resources for immigrant, refugee,
        asylee students and families.{" "}
      </p>
      <ul>
        <li>
          <a
            href="https://www2.ed.gov/about/overview/focus/immigration-resources.html"
            target="_blank"
          >
            Educational Resources
          </a>
        </li>

        <li>
          <a href="https://www.immigrant-education.ca/" target="_blank">
            Immigrant Education
          </a>
        </li>

        <li>
          <a
            href="https://www.apa.org/members/content/immigrant-students-resources"
            target="_blank"
          >
            Immigrant Student Resources
          </a>
        </li>

        <li>
          <a href="https://www.ilctr.org/programs/" target="_blank">
            English Language programs
          </a>
        </li>


       <li>
       <a href="https://www.kaplaninternational.com/united-states" target="_blank">English School in the united states
       </a>
       </li>
       
      </ul>
    </div>
  );
}

export default educationlanguage;
