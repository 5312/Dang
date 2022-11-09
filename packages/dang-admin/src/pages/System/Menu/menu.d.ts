declare namespace Menus {
  interface MenuList {
    ID: number;
    name: string;
    icon: string;
    parent_id: number;
    status: string;
    component: string;
    path: string;
    type: 0 | 1;
    hide: number;
    note: string;
    permission: string;
    sort: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeteledAt: Date;
  }
}