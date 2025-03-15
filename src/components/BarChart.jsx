import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import axios from "axios";

const CandlestickChart = () => {
  const [data, setData] = useState([]);
  const [theme, setTheme] = useState("light");
  const svgRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coincap.io/v2/candles?exchange=poloniex&interval=m1&baseId=bitcoin&quoteId=usd"
        );
        const newData = response.data.data.map((item) => ({
          time: new Date(item.period),
          open: +item.open,
          high: +item.high,
          low: +item.low,
          close: +item.close,
        }));
        setData(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const svg = d3.select(svgRef.current);
    const width = 1000;
    const height = 400;
    const margin = { top: 40, right: 20, bottom: 40, left: 60 };

    svg
      .attr("width", width)
      .attr("height", height)
      .style("background", theme === "light" ? "#f4f4f9" : "#1e1e1e")
      .style("display", "block")
      .style("margin", "0 auto");

    svg.selectAll("*").remove();

    // Top Heading
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "24px")
      .style("font-weight", "bold")
      .style("fill", theme === "light" ? "#333" : "#fff")
      .text("Bitcoin Price Candlestick Chart (Live)");

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.time))
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.low) - 5, d3.max(data, (d) => d.high) + 5])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Draw candlesticks
    svg
      .selectAll(".candle")
      .data(data)
      .join("rect")
      .attr("class", "candle")
      .attr("x", (d) => xScale(d.time) - 3)
      .attr("y", (d) => yScale(Math.max(d.open, d.close)))
      .attr("width", 6)
      .attr("height", (d) =>
        Math.max(1, Math.abs(yScale(d.open) - yScale(d.close)))
      )
      .attr("fill", (d) => (d.open > d.close ? "#e74c3c" : "#2ecc71"));

    // Draw high-low wicks
    svg
      .selectAll(".wick")
      .data(data)
      .join("line")
      .attr("class", "wick")
      .attr("x1", (d) => xScale(d.time))
      .attr("x2", (d) => xScale(d.time))
      .attr("y1", (d) => yScale(d.high))
      .attr("y2", (d) => yScale(d.low))
      .attr("stroke", (d) => (d.open > d.close ? "#e74c3c" : "#2ecc71"));

    // Draw X Axis
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(
        d3.axisBottom(xScale).ticks(10).tickFormat(d3.timeFormat("%H:%M:%S"))
      )
      .selectAll("text")
      .attr("fill", theme === "light" ? "#333" : "#fff");

    // Draw Y Axis
    svg
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).ticks(6).tickFormat(d3.format(".2f")))
      .selectAll("text")
      .attr("fill", theme === "light" ? "#333" : "#fff");
  }, [data, theme]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: theme === "light" ? "#f4f4f9" : "#1e1e1e",
        color: theme === "light" ? "#333" : "#fff",
      }}
    >
      <svg ref={svgRef}></svg>
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#5e72e4",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background 0.3s ease",
          }}
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
};

export default CandlestickChart;
