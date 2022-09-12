import useAxios, { UseAxiosResult } from "axios-hooks";
import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { getByName } from "./services/ExampleCountriesServices";
import { useMyAxios } from "./useAxios";

type pageContextValueProps = {
  values: UseAxiosResult;
  makeAnotherRequest: (name: string) => void;
};
//     {}?,
//     (name: string) => void
// ]

let pageContext = React.createContext({} as pageContextValueProps);

function usePageContext() {
  return useContext(pageContext);
}

type pageParams = {
  children: any;
};

export default function AxiosContext({ children }: pageParams) {

  const [{ data, loading, error, response }, refetch, c] = getByName('saudi')

  function makeAnotherRequest(name: string): void {
    // c();
    refetch({ url: `${name}` });
  }

  return (
    <pageContext.Provider
      value={{
        values: [{ data, loading, error, response }, refetch, c],
        makeAnotherRequest,
      }}
    >
      {children}
    </pageContext.Provider>
  );
}

function Comp1() {
  const { values, makeAnotherRequest } = usePageContext();
  const [{ data, loading, error, response }, refetch, c] = values;
  console.log();

  return (
    <>
      <h1>i am comp 1</h1>
      <p>my data is</p>
      <p>
      <div>
          {loading
            ? "loading ..."
            : error
            ? JSON.stringify(error)
            : `succsses with code ${response?.status} value is ${JSON.stringify(
                data
              )}`}
        </div>
        </p>
    </>
  );
}

function Comp2() {
  const { values, makeAnotherRequest } = usePageContext();
  const [{ data, loading, error, response }, refetch, c] = values;
  console.log();

  return (
    <>
      <h1>i am comp 2</h1>
      <p>
        my data is down, change me{" "}
        <input onChange={({ target }) => makeAnotherRequest(target.value)} />
      </p>
      <p>
        <div>
          {loading
            ? "loading ..."
            : error
            ? JSON.stringify(error)
            : `succsses with code ${response?.status} value is ${JSON.stringify(
                data
              )}`}
        </div>
      </p>
    </>
  );
}

export function AxiosContextComponent() {
  return (
    <AxiosContext>
      <Row xs={2}>
        <Col>
          <Comp1 />
        </Col>
        <Col>
          <Comp2 />
        </Col>
      </Row>
    </AxiosContext>
  );
}
