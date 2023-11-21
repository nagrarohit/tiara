export default function handler(req, res) {
  let pincodes = {
    133201: ["Subhri", "haryana"],
    133205: ["barara", " haryana"],
    133001: ["ambala", "haryana"],
    133002: ["yamunanagar", "haryana"],
  };
  res.status(200).json(pincodes);
}
