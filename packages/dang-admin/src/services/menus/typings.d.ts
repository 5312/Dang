declare namespace API {
  interface Page {
    total: number;
    page: number;
    limit: number;
  }

  interface Results {
    success?: boolean;
    msg: string;
    code: 0 | 1;
    data: Menus.MenuList[];
  }
}
