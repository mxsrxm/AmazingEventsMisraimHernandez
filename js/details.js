
import {showCardDetails} from "../modules/functions.js";
import {data} from "../data/data.js";
import {container_card_details} from "../modules/constants.js";

let id = parseInt(new URLSearchParams(window.location.search).get("_id"));

showCardDetails(id, data, container_card_details);