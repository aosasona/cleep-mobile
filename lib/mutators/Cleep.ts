import { Cleep } from "../types";

export default class CleepMutator {
  static append(data: Cleep[], cleep: Cleep): Cleep[] {
    const dup = data;
    const exists = CleepMutator.find(data, cleep);
    if (!exists) {
      dup.unshift(cleep);
    }

    return dup;
  }

  static delete(data: Cleep[], cleep: Cleep): Cleep[] {
    const exists = CleepMutator.find(data, cleep);
    if (exists) return;

    return data.filter((c) => c.id != cleep.id);
  }

  static find(data: Cleep[], cleep: Cleep): Cleep | null {
    return data.find((c) => c.id == cleep.id);
  }
}
