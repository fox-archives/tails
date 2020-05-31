import * as React from "react";
import { useState, useEffect } from "react";
import { PageHeader, Skeleton, Tabs, Layout } from "antd";
import ProjectsList from '@/components/ProjectsList'

let fetchData = async () => {
  let query = `{ projects { name, isSymbolicLink } }`;
  // await fetch('/graphql', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //   },
  //   body: JSON.stringify({ query })
  // })
  const dataRaw = await fetch("/api/data", {
    headers: {
      "Accept": "application/json",
    },
  });
  const data = await dataRaw.json();
  return data.data;
};

export default function Projects() {
  const [projects, setProjects] = useState(0);
  const [namespaces, setNamespaces] = useState(0);

  useEffect(() => {
    fetchData()
      .then(({ projects, namespaces }) => {
        setProjects(projects);
        setNamespaces(namespaces);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!projects) {
    return (
      <>
        <PageHeader title="Projects" subtitle="loading" />
        <Skeleton />
      </>
    );
  } else {
    return (
      <>
        <PageHeader title="Projects" />
        { /* TODO: cleaner method? */}
        <Layout.Content style={{ marginInlineStart: "12px", marginInlineEnd: "12px" }}>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="One" key="1">
              <ProjectsList projects={projects} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Two" key="2">
              <h1>two</h1>
            </Tabs.TabPane>
          </Tabs>
        </Layout.Content>

      </>
    );
  }
}
