//搜索和分页获取数据功能抽离
export async function usePage(initListApiCallback){
    const route = useRoute()
    const page = ref(parseInt(route.params.page))
    const limit = ref(10)

    const {
        data,
        pending,
        error,
        refresh
    } = await initListApiCallback({
        page:page.value,
        limit:limit.value
    })

    const rows = computed(()=>data.value?.rows ?? [])
    const total = computed(()=>data.value?.count ?? 0)

    const handlePageChange = (p)=>{
        navigateTo({
            params:{
                ...route.params,
                page:p
            },
            query:{
                ...route.query
            }
        })
    }

    return {
        page,
        limit,
        data,
        pending,
        error,
        refresh,
        rows,
        total,
        handlePageChange
    }
}