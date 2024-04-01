import { useEffect, useState } from "react"
import NFTCard from "../components/NftCard"
import { ethers } from "ethers"
interface CollectionsInterface {
  marketplace:any,
  nft:any,
  account:any
}
const Collections:React.FC<CollectionsInterface> = ({marketplace, nft,account}) => {
  const [purchases, setPurchases]:any = useState([])
  const loadPurchasedItems = async () => {
    const filter =  marketplace.filters.Bought(null,null,null,null,null,account)
    const results = await marketplace.queryFilter(filter)
    const purchases = await Promise.all(results.map(async i => {
      i = i.args
      const uri = await nft.tokenURI(i.tokenId)
      const response = await fetch(uri)
      const metadata = await response.json()
      const totalPrice = await marketplace.getTotalPrice(i.itemId)
      const priceInString = ethers.utils.formatEther(totalPrice);

      let purchasedItem = {
        totalPrice,
        price: i.price,
        itemId: i.itemId,
        name: metadata.name,
        description: metadata.description,
        image: metadata.imageUrl
      }
      return purchasedItem
    }))
    setPurchases(purchases)
  }
  useEffect(() => {
    loadPurchasedItems()
  }, [])
  return (<div>
    {
      purchases.map((i:any)=>{
        return <NFTCard name={i.name} description={i.description} imageUrl={i.image} item={i} price="10" key={i.itemId} />
      })
    }
  </div>

  )
}

export default Collections