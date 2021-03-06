import React from "react";
import {
  Switch,
  Redirect,
  Route,
  useRouteMatch,
  NavLink,
} from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { BiLogOutCircle } from "react-icons/bi";

import { RecipientModal } from "./recipients/RecipientModal";
// import auth from "../auth/authservice";

import { Home } from "./home";
import { Recipient } from "./recipients";
import { Merchant } from "./merchants";
import { PaymentModal } from "./deposit/PaymentModal";
import Deposit from "./deposit";

import { Transfer } from "./transfer";

import { TopBar } from "./TopBar";
import { Notification } from "./Notification";
import { useSelector } from "react-redux";

import { ProtectedOrgRoute } from "../auth/ProtectedOrgRoute";

import { useAuth } from "../auth/ProvideAuth";
import ErrorComponent from "./ErrorComponent";

require("dotenv").config();
const stripPromise = loadStripe(
  "pk_test_51I3gNIDsnRyoDmtJCrLBhlJX0PFNaFXNz8DHG90sOEl4Vv44lumjcQ9KDY6qdjVuwufFbUoc6J1dcpytArfRnM0k00IeDw03Rb"
);

const myroutes = [
  {
    path: "/dash/home",
    exact: true,
    main: () => <Home />,
  },
  {
    path: "/dash/recipients",
    exact: true,
    main: () => <Recipient />,
  },
  {
    path: "/dash/merchants",
    exact: true,
    main: () => <Merchant />,
  },
  {
    path: "/dash/deposit",
    exact: true,
    main: () => <Deposit />,
  },
  {
    path: "/dash/transfer",
    exact: true,
    main: () => <Transfer />,
  },
];

// Add use effect and add state as dependency
// In use effect change notification bar opacity

export const Dashboard = (props) => {
  const auth = useAuth();

  let { url } = useRouteMatch();

  const styles = {
    activelink: "block bg-yellow-300 rounded mx-4 ",
    link: "block mx-4 py-1",
  };

  const { notifications } = useSelector((state) => state.notifications);
  // console.log("The notifications array", notificationsarray);
  const recipient = useSelector((state) => state.recipients.selectedrecipient);

  return (
    <React.Fragment>
      
      <RecipientModal />

      <Elements stripe={stripPromise}>
        <PaymentModal />
      </Elements>

      <div className="h-screen bg-gray-100 overflow-auto">
        <ErrorComponent />

        <section className=" w-1/4 h-full absolute flex flex-col-reverse pb-14  ">
          {notifications.length > 0 &&
            notifications.map((notification) => {
              return (
                <Notification
                  notification={notification}
                  key={notification.id}
                />
              );
            })}
        </section>

        <div className=" rounded-2xl w-72  ml-4  bg-white fixed h-full">
          <div className="relative top-2 mb-2 h-full  pt-8 rounded">
            <div className="text-5xl pb-5 font-semibold text-center">MTOG</div>
            <div className="flex flex-col gap-2 text-center">
              <div>
                {/* <NavLink
                  to={`${url}/home`}
                  activeClassName={styles.activelink}
                  className={styles.link}
                >
                  Dashboard
                </NavLink> */}
              </div>
              <div>
                <NavLink
                  to={`${url}/recipients`}
                  activeClassName={styles.activelink}
                  className={styles.link}
                >
                  Recipients
                </NavLink>
              </div>

              <div>
                <NavLink
                  to={`${url}/merchants`}
                  activeClassName={styles.activelink}
                  className={styles.link}
                >
                  Merchants
                </NavLink>
              </div>
              <div>
                <NavLink
                  to={`${url}/deposit`}
                  activeClassName={styles.activelink}
                  className={styles.link}
                >
                  Deposit
                </NavLink>
              </div>
              <div>
                <NavLink
                  to={`${url}/transfer`}
                  activeClassName={styles.activelink}
                  className={styles.link}
                >
                  Transfer
                </NavLink>
              </div>
            </div>
            <div className=" absolute bottom-6  w-full  flex justify-center">
              <button
                className="py-1 rounded-lg border-2 w-full mx-4  hover:bg-red-500 hover:text-white z-0"
                onClick={() => {
                  auth.signout(() => {
                    props.history.push("/");
                  });
                }}
              >
                <BiLogOutCircle className="inline" />
                Sign out
              </button>
            </div>
          </div>
        </div>

        <div className=" ml-80  flex flex-col pr-5 relative h-full gap-10">
          <TopBar />
          <div className=" bottom-4 relative rounded-2xl border bg-white w-full h-full">
            <Switch>
              {myroutes.map((route, index) => (
                <ProtectedOrgRoute
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.main}
                />
              ))}
              <Route path="*">
                <Redirect to="/dash/home" />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

// export default Dashboard;
