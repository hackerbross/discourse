import Service, { inject as service } from "@ember/service";
import { ajax } from "discourse/lib/ajax";

export default class UserStatusService extends Service {
  @service appEvents;

  async set(status) {
    const data = {
      emoji: status.emoji,
      description: status.description,
      ends_at: status.endsAt.toISOString(),
    };

    await ajax({
      url: "/user-status.json",
      type: "PUT",
      data,
    });

    this.currentUser.set("status", status);
  }

  async clear() {
    await ajax({
      url: "/user-status.json",
      type: "DELETE",
    });

    this.currentUser.set("status", null);
  }
}
