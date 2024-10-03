const phone = new Proxy(
  {
    _clean: "",
    number: "",
    get clean() {
      return this._clean;
    },
  },
  {
    get(target, p, receiver) {
      if (!p.toString().startsWith("_")) {
        return target[p];
      } else {
        return "entry not found";
      }
    },
    set(target, p, newValue, receiver) {
      if (!p.toString().startsWith("_")) {
        target._clean = newValue.replace(/\D/g, "").substring(0, 10);

        const sections = {
          area: target._clean.substring(0, 3),
          prefix: target._clean.substring(3, 6),
          line: target._clean.substring(6, 10),
        };

        target.number =
          target._clean.length > 6
            ? `(${sections.area}) ${sections.prefix}-${sections.line}`
            : target._clean.length > 3
            ? `(${sections.area}) ${sections.prefix}`
            : target._clean.length > 0
            ? `(${sections.area})`
            : "";

        document.querySelectorAll("[data-phone_number]").forEach((item) => {
          if (item.tagName === "INPUT") {
            item.value = target.number;
          } else {
            item.innerText = target.number;
          }
        });

        return true;
      } else {
        return false;
      }
    },
  }
);
