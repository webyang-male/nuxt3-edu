//获取产品信息
export function useGetGoodsInfoApi(id,type="course"){
    return useHttpGet("",`/goods/read?type=${type}&id=${id}`,{
        lazy:true
    })
}