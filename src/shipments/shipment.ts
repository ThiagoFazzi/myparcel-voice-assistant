export interface  Shipment {
    type: String
    id: String
    attributes: Attributes
    relationships: Relationships
}
 interface Attributes {
    recipient_address: Address
    return_address: Address
    sender_address: Address
    pickup_location: PickupLocation | null
    description: String | null
    physical_properties: PhysicalProperties
    items: [ Items ] | null
    customs: Customs | null
    register_at: Number | null
}
 interface Relationships {
    service_options: ServiceOptions | null
    service_contract: ServiceContract
}
 interface ServiceOptions {
    data: {
        type: String
        id: String
    }  
    links: {
        related: String
    }
}
interface ServiceContract {
    data: {
        type: String
        id: String
    }
    links: {
        related: String
    }
}
interface Address {
    street_1: String
    street_2: String | null
    street_number: Number | null
    street_number_suffix: String | null
    postal_code: String 
    city: String
    region_code: String | null
    country_code: String 
    first_name: String
    last_name: String
    company: String | null
    email: String | null
    phone_number: String
}
interface PickupLocation {
        description: String 
        code: String
        address: Address
}
interface PhysicalProperties {
    height: Number | null
    width: Number | null
    length: Number | null
    volume: Number | null
    weight: Number 
}
interface Items {
        sku: String | null
        description: String 
        item_value: ItemValue | null
        quantity: Number
        hs_code: String | null
        nett_weight: Number
        origin_country_code: String | null
}
interface ItemValue {
    amount: Number 
    currency: String
}
interface Customs {
        content_type: ContentType
        invoice_number: String
        non_delivery: NonDelivery
        incoterm: Incoterm
        license_number: String | null
        certificate_number: String | null
}

enum ContentType {
    merchandise, 
    sample_merchandise,
    returned_merchandise, 
    gifts,
    documents 
}

enum  NonDelivery {
    return, 
    abandon 
}

enum Incoterm {
    DDU, 
    DDP
}

