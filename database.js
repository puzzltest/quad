import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { map } from "/map.js";
import { player } from "/player.js";
import { util } from "/util.js";

const url = "https://hwrnmdsdjevfcvgpablf.supabase.co";
const api_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3cm5tZHNkamV2ZmN2Z3BhYmxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgwNzkyOTQsImV4cCI6MjAzMzY1NTI5NH0.zYEJGqxrQYZoOensuJWG5NCyWC9vFhSbIvMVX3zVq5Y";
// const supabase = createClient(url, api_key);
const the_id = util.randletters(10);
let channel = null;

export const database = {};

database.init = function() {
  
  return;
  /*
  const supabase_realtime = createClient(url, api_key);
  const the_channel = supabase_realtime.channel("room");
  channel = the_channel;
  
  channel.on("broadcast", {
    event: "position",
  }, (payload) => {
    // console.log(JSON.stringify(payload));
    const data = payload.payload;
    if (data.id === the_id) return;
    data.t = Date.now();
    player.others[data.id] = data;
  });
  
  database.subscribe();*/
  
};

database.subscribe = function() {
  
  return;
  /*
  channel.subscribe((status) => {
    console.log(status);
    if (status === "SUBSCRIBED") {
      database.send();
    } else if (status === "CLOSED") {
      setTimeout(database.init, 1000);
    } else if (status === "CHANNEL_ERROR") {
      setTimeout(database.init, 5000);
    } else {
      
    }
  });*/
  
};

database.time = 0;
database.tick = function(time) {
  return;
  if (time - database.time < 30) return;
  database.time = time;
  // console.log(time);
  database.send();
};

database.send = function() {
  return;
  /*
  channel.send({
    type: "broadcast",
    event: "position",
    payload: {
      id: the_id,
      x: player.x,
      y: player.y,
      z: player.z,
      p: map.panel_ref.total_solved,
    },
  });*/
};