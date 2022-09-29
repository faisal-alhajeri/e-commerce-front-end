import React from "react";
import Center from "./layout/Center";
import FillHieght from "./layout/FillHieght";

export default function LoadingComponent({
  loading,
  children,
}: {
  loading: boolean;
  children?: any;
}) {
  return (
    <>
      {loading ? (
        <FillHieght>
          <Center>
            <span>
                
                loading ...
                </span>
            </Center>
        </FillHieght>
      ) : (
        children 
      )}
    </>
  );
}
