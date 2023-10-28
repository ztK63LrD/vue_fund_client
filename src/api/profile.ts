// 资金信息相关接口
import request from "@/utils/http";

// 枚举用户模块的接口地址
enum API {
  // 创建信息接口
  ADD_URL = '/profiles/add',
  // 获取所有信息接口
  GETALLPROFILE_URL = '/profiles',
  // 获取单个信息
  GETONEPROFILE_URL = '/profiles',
  // 编辑信息接口
  EDIT_URL = '/profiles/edit',
  // 删除信息接口
  DELETE_URL = '/profiles/delete'
}

// 创建/修改信息接口函数
export const addOrEditProfile = (data: any) => {
  // 修改已有数据
  if (data.id) {
    return request.post<any, any>(API.EDIT_URL+`/${data.id}`, data)
  } else {
    // 新增数据
    return request.post<any, any>(API.ADD_URL, data)
  }
}
// 获取所有信息接口函数
export const getAllProfile = () => request.get<any, any>(API.GETALLPROFILE_URL)
// 获取单个信息函数
export const getOneProfile = (id: any) => request.get<any, any>(API.GETONEPROFILE_URL+`/${id}`, id)
// 删除信息接口函数
export const deleteProfile = (id: any) => request.delete<any, any>(API.DELETE_URL+`/${id}`, id)
