import "react-dates/initialize";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";

let filterdateini = null;
let filterdatefin = null;
let dia = null;
let fechaini = null;
let fechafin = null;
let calmodel = {};
let inidate = "";
let dinidate = "";
let presentdate = "";
let dateshowpresentdate = null;
let showpresentdate = "";
let Calmodel = {};

class NewDatesParamsFilter extends Component {
  state = {
    dateini: null,
    dateshowpresentdate: null,
    focusedini: false,
    focusedfin: false,
    fechaini: "",
    fechafin: ""
  };

  componentDidMount() {
    // console.log(visfecha);
    this.resetCalendar();
    this.getStateinSession();
    this.processDatefromSession();
  }

  saveStateinSession = calmodel => {
    // Check for session storage support
    if (window.sessionStorage) {
      try {
        const parent = (this.props.parent && this.props.parent) || "Calmodel";
        // save text to local storage onkeyup
        // textValue.addEventListener("keyup", saveText);
        // sessionStorage.setItem("Calmodel", JSON.stringify({ ...calmodel }));
        sessionStorage.setItem(parent, JSON.stringify({ ...calmodel }));
        console.log({ titulo: `set ${parent}`, valor: { ...calmodel } });
      } catch (e) {
        // Alert user for errors
        // if (e == QUOTA_EXCEEDED_ERR) {
        //   alert("Storage limit exceeded");
        // }
        console.log({ titulo: `Error en sessionStorage`, valor: e });
      }
    } else {
      // No session storage support
      console.log("No session storage support");
    }
  };

  getStateinSession = () => {
    // Check for session storage support
    if (window.sessionStorage) {
      try {
        const parent = (this.props.parent && this.props.parent) || "Calmodel";
        // save text to local storage onkeyup
        // textValue.addEventListener("keyup", saveText);
        if (sessionStorage.getItem(parent)) {
          Calmodel = JSON.parse(sessionStorage.getItem(parent));
          // console.log({ titulo: `get ${parent}`, valor: Calmodel });
        } else {
          console.log(`No saved value for ${parent}`);
        }
      } catch (e) {
        // Alert user for errors
        // if (e == QUOTA_EXCEEDED_ERR) {
        //   alert("Storage limit exceeded");
        // }
        console.log({ titulo: `Error en sessionStorage`, valor: e });
      }
      // if (sessionStorage.getItem("Text")) {
      //   textValue.value = sessionStorage.getItem("Text");
      // }
    } else {
      // No session storage support
      console.log("No session storage support");
    }
  };

  processDatefromSession = () => {
    if (Calmodel.hasOwnProperty("fecini")) {
      fechaini = Calmodel.fecini.split("-");
      fechafin = Calmodel.fecfin.split("-");
      showpresentdate = Calmodel.showpresentdate.split("-");
      filterdateini = moment(
        fechaini[2] + "-" + fechaini[1] + "-" + fechaini[0]
      );
      filterdatefin = moment(
        fechafin[2] + "-" + fechafin[1] + "-" + fechafin[0]
      ).format("DD-MM-YYYY");
      dateshowpresentdate = moment(
        showpresentdate[2] + "-" + showpresentdate[1] + "-" + showpresentdate[0]
      );
      this.setState({
        dateini: filterdateini,
        dateshowpresentdate: dateshowpresentdate,
        fechafin: filterdatefin,
        fechaini: filterdateini.format("DD-MM-YYYY")
      });
      calmodel = this.props.calmodel;
      calmodel["fecfin"] = filterdatefin;
      calmodel["showpresentdate"] = dateshowpresentdate.format("DD-MM-YYYY");
      calmodel["fecini"] = filterdateini.format("DD-MM-YYYY");
      this.props.onCalModelUpdate(calmodel);
    }
  };

  resetCalendar = () => {
    filterdateini = moment().subtract(90, "days");
    if (typeof filterdateini != null) {
      // console.log("Dia antes: ", filterdateini.day());
      dia = filterdateini.day();
      if (dia == 0) {
        filterdateini = moment().subtract(92, "days");
      } else if (dia == 6) {
        filterdateini = moment().subtract(91, "days");
      }
    }
    fechaini = filterdateini.format("DD-MM-YYYY");
    filterdatefin = moment().add(90, "days");
    // dateshowpresentdate = moment().add(90, "days");
    if (typeof filterdatefin != null) {
      // console.log("Dia antes: ", filterdatefin.day());
      dia = filterdatefin.day();
      if (dia == 0) {
        filterdatefin = moment().add(91, "days");
        // dateshowpresentdate = moment().add(91, "days");
      } else if (dia == 6) {
        filterdatefin = moment().add(92, "days");
        // dateshowpresentdate = moment().add(92, "days");
      }
    }
    dateshowpresentdate = moment(filterdatefin);
    // console.log({ titulo: "filterdatefin", valor: filterdatefin });
    // console.log({ titulo: "dateshowpresentdate1", valor: dateshowpresentdate });
    fechafin = filterdatefin.add(1, "days").format("DD-MM-YYYY");
    // console.log({ titulo: "fechafin", valor: fechafin });
    showpresentdate = dateshowpresentdate.format("DD-MM-YYYY");
    // console.log({ titulo: "dateshowpresentdate2", valor: dateshowpresentdate });
    // console.log({ titulo: "showpresentdate", valor: showpresentdate });
    this.setState({
      dateini: filterdateini,
      dateshowpresentdate: dateshowpresentdate,
      fechaini: fechaini,
      fechafin: fechafin
    });
    calmodel = this.props.calmodel;
    calmodel["fecfin"] = fechafin;
    calmodel["showpresentdate"] = showpresentdate;
    calmodel["fecini"] = fechaini;
    this.props.onCalModelUpdate(calmodel);
  };

  searchDates = e => {
    e.preventDefault();
    this.props.onSearchDates();
  };

  resetCal = e => {
    e.preventDefault();
    this.resetCalendar();
    this.props.onResetCal();
    calmodel = this.props.calmodel;
    this.saveStateinSession(calmodel);
  };

  handleSelectChange = e => {
    // console.log(`e: ${e.target.value}`);
    this.props.onUpdateItemsperPage(e.target.value);
  };

  cambiarFecha = (tipo, date) => {
    calmodel = this.props.calmodel;
    switch (tipo) {
      case "ini":
        if (typeof date != null) {
          calmodel["fecini"] = date.format("DD-MM-YYYY");
          this.setState({ dateini: date, fechaini: date.format("DD-MM-YYYY") });
        }
        break;
      case "fin":
        if (typeof date != null) {
          fechafin = moment(date)
            .add(1, "days")
            .format("DD-MM-YYYY");
          // console.log({ titulo: "fechafin", valor: fechafin });
          calmodel["fecfin"] = moment(date)
            .add(1, "days")
            .format("DD-MM-YYYY");
          calmodel["showpresentdate"] = date.format("DD-MM-YYYY");
          showpresentdate = date.format("DD-MM-YYYY");
          this.setState({
            dateshowpresentdate: date,
            fechafin,
            showpresentdate
          });
        }
        break;
      default:
    }
    this.props.onCalModelUpdate(calmodel);
    this.saveStateinSession(calmodel);
  };

  handleChangeVendedor = codven => {
    calmodel = this.props.calmodel;
    calmodel["codven"] = codven;
    this.props.onCalModelUpdate(calmodel);
    // console.log({ titulo: "codven", valor: codven });
    // this.setState({ codven });
  };

  handleResetVendedor = () => {
    calmodel = this.props.calmodel;
    calmodel["codven"] = "";
    this.props.onCalModelUpdate(calmodel);
    // console.log({ titulo: "codven", valor: codven });
    // this.setState({ codven });
  };

  render() {
    return (
      <div className="well well-sm">
        <form className="form-inline">
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="fechaini">Inicio</label>
                &nbsp;
                <SingleDatePicker
                  id="fechaini"
                  date={this.state.dateini} // momentPropTypes.momentObj or null
                  onDateChange={date => this.cambiarFecha("ini", date)} // PropTypes.func.isRequired
                  focused={this.state.focusedini} // PropTypes.bool
                  onFocusChange={({ focused }) =>
                    this.setState({ focusedini: focused })
                  } // PropTypes.func.isRequired
                  displayFormat="DD-MM-YYYY"
                  firstDayOfWeek={1}
                  numberOfMonths={1}
                  isOutsideRange={() => {
                    return false;
                  }}
                  isDayHighlighted={() => {
                    return true;
                  }}
                />
              </div>
              &nbsp;
              <div className="form-group">
                <label htmlFor="fechafin">Fin</label>
                &nbsp;
                <SingleDatePicker
                  id="fechafin"
                  date={this.state.dateshowpresentdate} // momentPropTypes.momentObj or null
                  onDateChange={date => this.cambiarFecha("fin", date)} // PropTypes.func.isRequired
                  focused={this.state.focusedfin} // PropTypes.bool
                  onFocusChange={({ focused }) =>
                    this.setState({ focusedfin: focused })
                  } // PropTypes.func.isRequired
                  displayFormat="DD-MM-YYYY"
                  firstDayOfWeek={1}
                  numberOfMonths={1}
                  isOutsideRange={() => {
                    return false;
                  }}
                  isDayHighlighted={() => {
                    return true;
                  }}
                />
              </div>
              &nbsp;
              <button
                id="consultarfec"
                className="btn btn-info"
                onClick={this.searchDates}
              >
                Consultar
              </button>
              &nbsp;
              <button
                id="resetfec"
                className="btn btn-primary"
                onClick={this.resetCal}
              >
                <span className="glyphicon glyphicon-refresh" />
                <span className="glyphicon glyphicon-calendar" />
              </button>
              &nbsp;
              <div className="form-group">
                <label htmlFor="nitems" className="control-label">
                  Items/p&aacute;g
                </label>
                &nbsp;
                <select
                  id="nitems"
                  value={this.props.itemsperpage}
                  name="nitems"
                  className="form-control"
                  onChange={this.handleSelectChange}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

NewDatesParamsFilter.propTypes = {
  onCalModelUpdate: PropTypes.func.isRequired,
  onSearchDates: PropTypes.func.isRequired,
  onResetCal: PropTypes.func.isRequired,
  calmodel: PropTypes.object
  // tstnombre: PropTypes.string,
  // tstrif: PropTypes.string,
};

export default NewDatesParamsFilter;
