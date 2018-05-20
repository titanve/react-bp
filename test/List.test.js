import List from "../src/components/List";
import React from "react";
import { shallow } from "enzyme";

describe("List", () => {
  test("should match snapshot", () => {
    const baseProps = {
      // whatever fake props you want passed to the component
      // ...
      onLoadPosts: jest.fn()
    };
    const wrapper = shallow(<List {...baseProps} />);

    // expect(wrapper.find("h1").text()).toBe("Welcome to my starter app");
    // const forma = wrapper.find("FormattedMessage");
    // expect(forma.props().id).toBe("detail.titulo");
    expect(wrapper).toMatchSnapshot;
  });
});

it("renders expected components", () => {
  const baseProps = {
    // whatever fake props you want passed to the component
    // ...
    onLoadPosts: jest.fn()
  };
  const wrapper = shallow(<List {...baseProps} />);

  const forma = wrapper.find("FormattedMessage");
  expect(forma.props().id).toBe("detail.titulo");
});
