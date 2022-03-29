import * as path from "path";

export const uploadsFolderPath = path.join(__dirname, "../private/uploads");

export const authCookieOptions = (secure: boolean) => {
  // const oneDay = 1 * 24 * 3600 * 1000; // 1 day
  const oneWeek = 7 * 24 * 3600 * 1000;

  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + oneWeek),
    maxAge: oneWeek,
    secure,
  };

  return cookieOptions;
};

export const getEnv = ({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: string;
}): string => {
  const value = process.env[name];

  if (!value && typeof defaultValue !== "undefined") {
    return defaultValue;
  }

  return value || "";
};

export const paginate = (
  collection,
  params: { ids?: string[]; page?: number; perPage?: number }
) => {
  const { page = 0, perPage = 0, ids } = params || { ids: null };

  const _page = Number(page || "1");
  const _limit = Number(perPage || "20");

  if (ids) {
    return collection;
  }

  return collection.limit(_limit).skip((_page - 1) * _limit);
};

export const fixDate = (value, defaultValue = new Date()): Date => {
  const date = new Date(value);

  if (!isNaN(date.getTime())) {
    return date;
  }

  return defaultValue;
};

export const getDate = (date: Date, day: number): Date => {
  const currentDate = new Date();

  date.setDate(currentDate.getDate() + day + 1);
  date.setHours(0, 0, 0, 0);

  return date;
};

export const validSearchText = (values: string[]) => {
  const value = values.join(" ");

  if (value.length < 512) {
    return value;
  }

  return value.substring(0, 511);
};

export const generateRandomString = (len: number = 10) => {
  const charSet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let randomString = "";

  for (let i = 0; i < len; i++) {
    const position = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(position, position + 1);
  }

  return randomString;
};
