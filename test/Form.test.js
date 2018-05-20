import Form from "../src/components/Form";
import React from "react";
import { shallow } from "enzyme";

describe("Form", () => {
  test("should match snapshot", () => {
    const wrapper = shallow(<Form />);

    expect(wrapper.find("h1").text()).toBe("Form!");
    // const forma = wrapper.find("FormattedMessage");
    // expect(forma.props().id).toBe("detail.titulo");
    expect(wrapper).toMatchSnapshot;
  });
});

// it("renders expected components", () => {
//   const wrapper = shallow(<Form />);
//
//   const forma = wrapper.find("FormattedMessage");
//   expect(forma.props().id).toBe("detail.titulo");
// });
