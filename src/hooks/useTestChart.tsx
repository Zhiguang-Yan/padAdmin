/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as echarts from 'echarts'
import { debounce } from 'lodash'


const useTestChart = (options)=>{
    const chartRef = useRef(null) as any;

    const [chartOption, setChartOption] = useState(options);
    const [myChart , setMychart] = useState<any>();

    const resizeHandler = ()=>{
        window.addEventListener('resize',chartResize)
    }
    const removeReizeHanlder = ()=>{
        window.removeEventListener('resize',chartResize)
    }

    const initChart = ()=>{
        const Mychart  = echarts?.init(chartRef?.current)
        setMychart(Mychart)
        Mychart?.setOption(chartOption);

    }

    useEffect(()=>{
        initChart()
        resizeHandler();
        return  removeReizeHanlder;
    },[])

    useEffect(()=>{
        myChart?.setOption(chartOption);
    },[chartOption])

    function chartResize (){
        debounce( ()=> {
            chartRef.current?.resize()
          }, 300)
    }
    return {
        chartRef,
        setChartOption  //暴不暴露都一样 传入的options改变自动更新
    }

}


export default useTestChart;
