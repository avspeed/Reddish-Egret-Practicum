import React from "react";
import Link from "next/link";

const Resources = () => {
  return (
    <div>
      <h2>
        These resources can be invaluable assets for social workers engaging
        with immigrant and refugee clients.
      </h2>
      <p>
        Consider using the following resources, which include toolkits,
        informational pages, guides, and organizational websites, broken down by
        issue area:
      </p>
      <ul>
        <li>Education</li>
        <li>Employment </li>
        <li>Health</li>
        <li>Housing and Resettlement</li>
        <li>Legal Safety</li>
      </ul>

      <a
        href="https://www.onlinemswprograms.com/resources/social-issues/support-resources-immigrants-refugees/"
        style={{ color: "blue" }}
        target={"_blank"}
      >
        Follow the Link
      </a>
      <hr />
      <Link href="/">Back home</Link>
    </div>
  );
};

export default Resources;
