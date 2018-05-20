import List from "../src/components/List";
import React from "react";
import { shallow } from "enzyme";

describe("List", () => {
  test("should match snapshot", () => {
    const wrapper = shallow(<List />);

    // expect(wrapper.find("h1").text()).toBe("Welcome to my starter app");
    // const forma = wrapper.find("FormattedMessage");
    // expect(forma.props().id).toBe("detail.titulo");
    expect(wrapper).toMatchSnapshot;
  });
});

it("renders expected components", () => {
  const wrapper = shallow(<List />);

  const forma = wrapper.find("FormattedMessage");
  expect(forma.props().id).toBe("detail.titulo");
});
