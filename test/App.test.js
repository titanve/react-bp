import App from "../src/components/App";
import React from "react";
import { shallow } from "enzyme";

describe("App", () => {
  test("should match snapshot", () => {
    const wrapper = shallow(<App />);

    // expect(wrapper.find("h1").text()).toBe("Welcome to my starter app");
    // const forma = wrapper.find("FormattedMessage");
    // expect(forma.props().id).toBe("detail.titulo");
    expect(wrapper).toMatchSnapshot;
  });
});

it("renders expected components", () => {
  const wrapper = shallow(<App />);

  const forma = wrapper.find("FormattedMessage");
  expect(forma.props().id).toBe("detail.titulo");
});
