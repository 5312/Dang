declare namespace API {
  interface Page {
    list: Menus.MenuList[];
    count: number;
    pageIndex: number;
    pageSize: number;
  }

  interface Results {
    msg: string;
    code: number;
    data: Menus.MenuList[];
  }
}
