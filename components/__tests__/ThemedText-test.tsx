import * as React from "react";
import { ThemedText } from "../ThemedText";
import renderer from "react-test-renderer";

it(`renders correctly`, () => {
  const tree = renderer.create(<ThemedText>Snapshot test!</ThemedText>).toJSON();

  expect(tree).toMatchSnapshot();
});
