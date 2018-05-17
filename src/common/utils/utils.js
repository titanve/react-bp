import fetch from "isomorphic-fetch";

export function flattenMessages(nestedMessages = {}, prefix = "") {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    let value = nestedMessages[key];
    let prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "string") {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
}

export async function DbTransaction(args) {
  // console.log(args);
  const response = await fetch(args.url, args.options);
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
}

export function uniqueItems(items, idkey) {
  let chkItems = [];
  let uniqueItems = [];
  items.map(item => {
    if (chkItems.indexOf(item[idkey]) === -1) {
      if (typeof item[idkey] !== "undefined") {
        chkItems.push(item[idkey]);
        uniqueItems.push(item);
      }
    }
  });
  return uniqueItems;
}

export function uniqueItemsEntity(items, idkey, fields) {
  let chkItems = [];
  let uniqueItemswithProps = [];
  items.map(item => {
    // for (let k in item) {
    // console.log(k);
    // if (fields.indexOf(k) === 1) {
    // console.log(item);
    if (typeof item[idkey] !== "undefined") {
      if (chkItems.indexOf(item[idkey]) === -1) {
        uniqueItemswithProps.push(item);
        chkItems.push(item[idkey]);
      }
    }
    // }
    // }
  });
  return uniqueItemswithProps;
}

export function uniqueItemsEntity2Keys(items, idkey, idkey2, fields) {
  let chkItems = [];
  let uniqueItemswithProps = [];
  let newitem = {};
  items.map(item => {
    if (
      typeof item[idkey] !== "undefined" &&
      typeof item[idkey2] !== "undefined"
    ) {
      if (chkItems.indexOf(item[idkey] + item[idkey2]) === -1) {
        for (let k in item) {
          if (fields.indexOf(k) !== -1) {
            newitem[k] = item[k];
          }
        }
        uniqueItemswithProps.push(newitem);
        chkItems.push(item[idkey] + item[idkey2]);
        newitem = {};
      }
    }
  });
  return uniqueItemswithProps;
}
