import OutgoingMessage from "../src/OutgoingMessage";

describe("OutgoingMessage", () => {

  describe("writeHead", () => {

    it("Should throws with an invalid status code", () => {
      const res = new OutgoingMessage();
      expect(() => {
        res.writeHead(1);
      }).toThrow(/^Invalid status code: 1/);
    });

    it("Should handle unknown status codes", () => {
      const context = { res: {} };
      const res = new OutgoingMessage(context);

      res.writeHead(998);

      expect(res.statusMessage).toBe("unknown");
      expect(context.res.status).toBe(998);
    });

    it("Should work with headers", () => {
      const context = { res: {} };
      const res = new OutgoingMessage(context);

      res.writeHead(200, null, { foo: "bar" });

      expect(res.statusMessage).toBe("OK");
      expect(context.res.status).toBe(200);
      expect(context.res.headers).toEqual({ foo: "bar" });
    });

    it("Should work with headers with previous headers", () => {
      const context = { res: {} };
      const res = new OutgoingMessage(context);
      res._headers = { previous: "previous" };
      res._renderHeaders = () => res._headers;

      res.writeHead(200, null, { foo: "bar" });

      expect(res.statusMessage).toBe("OK");
      expect(context.res.status).toBe(200);
      expect(context.res.headers).toEqual({ foo: "bar", previous: "previous" });
    });

    it("Should work with a status message", () => {
      const context = { res: {} };
      const res = new OutgoingMessage(context);

      res.writeHead(200, "baz", { foo: "bar" });

      expect(res.statusMessage).toBe("baz");
      expect(context.res.status).toBe(200);
      expect(context.res.headers).toEqual({ foo: "bar" });
    });

    it("Should work with a headers as second parameter if no status message is given", () => {
      const context = { res: {} };
      const res = new OutgoingMessage(context);

      res.writeHead(200, { foo: "bar" });

      expect(res.statusMessage).toBe("OK");
      expect(context.res.status).toBe(200);
      expect(context.res.headers).toEqual({ foo: "bar" });
    });

  });

});
